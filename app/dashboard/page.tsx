'use client';

import { useCustomer, usePricingTable } from 'autumn-js/react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lock, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductChangeDialog from '@/components/autumn/product-change-dialog';
import { useProfile, useUpdateProfile, useSettings, useUpdateSettings } from '@/hooks/useProfile';

// Separate component that uses Autumn hooks
function DashboardContent({ session }: { session: any }) {
  const { customer, attach } = useCustomer();
  const { products } = usePricingTable();
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
  
  // Profile and settings hooks
  const { data: profileData } = useProfile();
  const updateProfile = useUpdateProfile();
  const { data: settings } = useSettings();
  const updateSettings = useUpdateSettings();
  
  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    displayName: '',
    bio: '',
    phone: '',
  });

  useEffect(() => {
    if (profileData?.profile) {
      setProfileForm({
        displayName: profileData.profile.displayName || '',
        bio: profileData.profile.bio || '',
        phone: profileData.profile.phone || '',
      });
    }
  }, [profileData]);

  const handleSaveProfile = async () => {
    await updateProfile.mutateAsync(profileForm);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    if (profileData?.profile) {
      setProfileForm({
        displayName: profileData.profile.displayName || '',
        bio: profileData.profile.bio || '',
        phone: profileData.profile.phone || '',
      });
    }
  };

  const handleSettingToggle = async (key: string, value: boolean) => {
    await updateSettings.mutateAsync({ [key]: value });
  };

  // Get current user's products and features
  const userProducts = customer?.products || [];
  const userFeatures = customer?.features || {};
  
  // Find the actual active product (not scheduled)
  const activeProduct = userProducts.find(p => 
    p.status === 'active' || p.status === 'trialing' || p.status === 'past_due'
  );
  const scheduledProduct = userProducts.find(p => 
    p.status === 'scheduled' || (p.started_at && new Date(p.started_at) > new Date())
  );

  const handleUpgrade = async (productId: string) => {
    try {
      setLoadingProductId(productId);
      await attach({
        productId,
        dialog: ProductChangeDialog,
        returnUrl: window.location.origin + '/dashboard',
        successUrl: window.location.origin + '/dashboard',
        cancelUrl: window.location.origin + '/dashboard',
      });
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {session.user?.email?.split('@')[0] || 'User'}
          </p>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Current Plan</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                {activeProduct ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    {activeProduct.name || activeProduct.id}
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    Free Plan
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {scheduledProduct && (
                <p className="text-xs text-muted-foreground">
                  Switching to {scheduledProduct.name} on {new Date(scheduledProduct.started_at || scheduledProduct.current_period_end).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Account Email</CardDescription>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                {session.user?.email}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Account Status</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Active
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Usage Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Monitor your feature usage and limits</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(userFeatures).length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(userFeatures).map(([featureId, feature]) => {
                      const total = feature.included_usage || feature.balance + (feature.usage || 0);
                      const used = feature.usage || 0;
                      const percentage = Math.min((used / (total || 1)) * 100, 100);

                      return (
                        <div key={featureId} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium capitalize">
                              {featureId.replace(/_/g, ' ')}
                            </h3>
                            <span className="text-sm text-muted-foreground">
                              {used} / {total}
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          {feature.next_reset_at && (
                            <p className="text-xs text-muted-foreground">
                              Resets on {new Date(feature.next_reset_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No usage data available
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
                  </div>
                  <button
                    onClick={() => handleSettingToggle('emailNotifications', !settings?.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings?.emailNotifications ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                    disabled={updateSettings.isPending}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings?.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                  </div>
                  <button
                    onClick={() => handleSettingToggle('marketingEmails', !settings?.marketingEmails)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings?.marketingEmails ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                    disabled={updateSettings.isPending}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings?.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Manage your personal information</CardDescription>
                  </div>
                  {!isEditingProfile ? (
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSaveProfile}
                        size="sm"
                        disabled={updateProfile.isPending}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        size="sm"
                        variant="outline"
                        disabled={updateProfile.isPending}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email
                    </label>
                    <p className="text-sm p-3 bg-secondary/50 rounded-lg">{session.user?.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Display Name
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profileForm.displayName}
                        onChange={(e) => setProfileForm({ ...profileForm, displayName: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800"
                        placeholder="Enter your display name"
                      />
                    ) : (
                      <p className="text-sm p-3 bg-secondary/50 rounded-lg">
                        {profileData?.profile?.displayName || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Phone
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="text-sm p-3 bg-secondary/50 rounded-lg">
                        {profileData?.profile?.phone || 'Not set'}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    {isEditingProfile ? (
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-800"
                        rows={3}
                        placeholder="Tell us about yourself"
                      />
                    ) : (
                      <p className="text-sm p-3 bg-secondary/50 rounded-lg">
                        {profileData?.profile?.bio || 'Not set'}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Plans Tab */}
          <TabsContent value="plans">
            <Card>
              <CardHeader>
                <CardTitle>Available Plans</CardTitle>
                <CardDescription>Upgrade or change your subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                {!products ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {products.map((product) => {
                      const isCurrentPlan = activeProduct?.id === product.id;
                      const isScheduledPlan = scheduledProduct?.id === product.id;
                      const features = product.properties?.is_free ? product.items : product.items?.slice(1) || [];

                      return (
                        <Card key={product.id} className={`relative ${isCurrentPlan ? 'border-orange-500 border-2' : ''}`}>
                          {isCurrentPlan && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Current Plan
                              </span>
                            </div>
                          )}
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              {product.display?.name || product.name}
                              {isScheduledPlan && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                  Scheduled
                                </span>
                              )}
                            </CardTitle>
                            {product.display?.description && (
                              <CardDescription>{product.display.description}</CardDescription>
                            )}
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 mb-4">
                              {features.slice(0, 3).map((item, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  {isCurrentPlan ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Lock className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className={!isCurrentPlan ? 'text-muted-foreground' : ''}>
                                    {item.display?.primary_text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {!isCurrentPlan && !isScheduledPlan && (
                              <Button
                                onClick={() => handleUpgrade(product.id)}
                                className="w-full"
                                variant={product.properties?.is_free ? 'outline' : 'default'}
                                disabled={loadingProductId !== null}
                              >
                                {loadingProductId === product.id ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Loading...
                                  </>
                                ) : (
                                  product.properties?.is_free ? 'Downgrade' : 'Upgrade'
                                )}
                              </Button>
                            )}
                            {isScheduledPlan && (
                              <p className="text-sm text-center text-muted-foreground">
                                Starts {new Date(scheduledProduct.started_at || scheduledProduct.current_period_end).toLocaleDateString()}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render DashboardContent when we have a session and AutumnProvider is available
  return <DashboardContent session={session} />;
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MessageSquare, TrendingUp, CreditCard, User } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'analysis' | 'chat' | 'subscription' | 'profile';
  title: string;
  description?: string;
  timestamp: Date;
}

interface ActivityTimelineProps {
  activities: Activity[];
  maxItems?: number;
}

const activityIcons = {
  analysis: TrendingUp,
  chat: MessageSquare,
  subscription: CreditCard,
  profile: User,
};

const activityColors = {
  analysis: 'bg-blue-100 text-blue-600',
  chat: 'bg-green-100 text-green-600',
  subscription: 'bg-orange-100 text-orange-600',
  profile: 'bg-purple-100 text-purple-600',
};

export function ActivityTimeline({ activities, maxItems = 5 }: ActivityTimelineProps) {
  const displayedActivities = activities.slice(0, maxItems);

  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your recent actions will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">No activity yet</p>
            <p className="text-sm text-gray-500">
              Start using the platform to see your activity here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <div key={activity.id} className="flex gap-4">
                {/* Timeline line */}
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < displayedActivities.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 absolute top-10" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  {activity.description && (
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {format(activity.timestamp, 'PPp')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length > maxItems && (
          <button className="text-sm text-orange-600 hover:text-orange-700 font-medium mt-4 w-full text-center">
            View all activity →
          </button>
        )}
      </CardContent>
    </Card>
  );
}

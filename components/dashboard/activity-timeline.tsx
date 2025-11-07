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
  subscription: 'bg-zinc-100 text-[#111111]',
  profile: 'bg-purple-100 text-purple-600',
};

export function ActivityTimeline({ activities, maxItems = 5 }: ActivityTimelineProps) {
  const displayedActivities = activities.slice(0, maxItems);

  if (activities.length === 0) {
    return (
      <Card className="rounded-[32px] border border-[#ece8dd] bg-white/95">
        <CardHeader>
          <CardTitle className="font-neueBit text-[24px] text-[#111111]">Recent Activity</CardTitle>
          <CardDescription className="font-apercu uppercase tracking-[0.24em] text-[#6a665d]">
            Your recent actions will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#f1f1f1] rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-2">No activity yet</p>
            <p className="text-sm text-gray-500">Start using the platform to see your activity here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[32px] border border-[#ece8dd] bg-white/95">
      <CardHeader>
        <CardTitle className="font-neueBit text-[24px] text-[#111111]">Recent Activity</CardTitle>
        <CardDescription className="font-apercu uppercase tracking-[0.24em] text-[#6a665d]">
          Your latest actions and updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayedActivities.map((activity, index) => {
            const Icon = activityIcons[activity.type];
            const colorClass = activityColors[activity.type];

            return (
              <div key={activity.id} className="flex gap-4">
                <div className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < displayedActivities.length - 1 && (
                    <div className="w-0.5 h-full bg-[#ece8dd] absolute top-10" />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <p className="font-neueBit text-[18px] text-[#111111]">{activity.title}</p>
                  {activity.description && (
                    <p className="text-sm text-[#6a665d] mt-1">{activity.description}</p>
                  )}
                  <p className="text-xs text-[#8b867c] mt-2 flex items-center gap-1 font-apercu uppercase tracking-[0.2em]">
                    <Clock className="w-3 h-3" />
                    {format(activity.timestamp, 'PPp')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {activities.length > maxItems && (
          <button className="text-sm text-[#111111] underline decoration-dotted underline-offset-4 font-medium mt-4 w-full text-center">
            View all activity ?
          </button>
        )}
      </CardContent>
    </Card>
  );
}

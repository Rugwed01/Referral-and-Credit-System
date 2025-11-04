/**
 * Dashboard Page
 * Main user dashboard with referral metrics and tools
 */

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { MetricsCard, ReferralLink, ReferredUsersList } from '@/components/features';
import { useReferralCode, useReferralLink, useReferralMetrics, useReferralActions } from '@/stores';
import { LoadingLayout } from '@/components/layout';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function DashboardPage() {
  const referralCode = useReferralCode();
  const referralLink = useReferralLink();
  const metrics = useReferralMetrics();
  const { loadReferralData } = useReferralActions();

  // Load referral data on mount
  useEffect(() => {
    loadReferralData();
  }, [loadReferralData]);

  // Show loading state while data is being fetched
  if (!referralCode || !referralLink) {
    return <LoadingLayout />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="mb-2">
          <h1 className="text-3xl font-bold text-foreground">
            My Referral Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your referrals, earnings, and share your referral link
          </p>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricsCard
          title="Total Referred"
          value={metrics.totalReferred}
          subtitle="Users who signed up"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
        />

        <MetricsCard
          title="Converted Users"
          value={metrics.convertedUsers}
          subtitle="Users who made purchases"
          icon={<ShoppingCart className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
        />

        <MetricsCard
          title="Total Credits"
          value={metrics.totalCredits}
          subtitle="Available to use"
          icon={<DollarSign className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
        />

        <MetricsCard
          title="Conversion Rate"
          value={`${metrics.totalReferred > 0 ? Math.round((metrics.convertedUsers / metrics.totalReferred) * 100) : 0}%`}
          subtitle="Referral to purchase rate"
          icon={<TrendingUp className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Link */}
        <motion.div variants={itemVariants}>
          <ReferralLink
            referralCode={referralCode}
            referralLink={referralLink}
          />
        </motion.div>

        {/* Recent Referrals */}
        <motion.div variants={itemVariants}>
          <ReferredUsersList
            referredUsers={[]} // This would come from the store
          />
        </motion.div>
      </div>

      {/* Additional Sections */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">View Referrals</span>
              </div>
              <p className="text-sm text-muted-foreground">
                See detailed referral history and analytics
              </p>
            </button>

            <button className="p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-foreground">Credit History</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Track your credits earned and spent
              </p>
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Pro Tips
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Share on Social Media:</strong> Post your referral link on platforms like Twitter, Facebook, and LinkedIn to reach more people.
              </p>
            </div>
            <div className="p-3 bg-success/5 border border-success/10 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Personalize Your Message:</strong> Add a personal note when sharing to increase conversion rates.
              </p>
            </div>
            <div className="p-3 bg-warning/5 border border-warning/10 rounded-lg">
              <p className="text-sm text-foreground">
                <strong>Follow Up:</strong> Check in with people who've used your link to help them get started.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
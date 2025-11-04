/**
 * Referred Users List Component
 * Displays list of users who have been referred by the current user
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { ReferredUser } from '@/types';
import { cn } from '@/utils/cn';

interface ReferredUsersListProps {
  referredUsers: ReferredUser[];
  className?: string;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

export const ReferredUsersList: React.FC<ReferredUsersListProps> = ({
  referredUsers,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'converted'>('all');

  const filteredUsers = referredUsers.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const displayedUsers = isExpanded ? filteredUsers : filteredUsers.slice(0, 5);

  const getStatusIcon = (status: 'pending' | 'converted') => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'converted':
        return <UserCheck className="h-4 w-4 text-success" />;
    }
  };

  const getStatusText = (status: 'pending' | 'converted') => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'converted':
        return 'Converted';
    }
  };

  const getStatusColor = (status: 'pending' | 'converted') => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'converted':
        return 'text-success bg-success/10 border-success/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (referredUsers.length === 0) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No referred users yet
          </h3>
          <p className="text-sm text-muted-foreground">
            Start sharing your referral link to earn rewards!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Referred Users
              </h3>
              <p className="text-sm text-muted-foreground">
                {referredUsers.length} total users referred
              </p>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {(['all', 'pending', 'converted'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                  filter === status
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status === 'all' && ` (${referredUsers.length})`}
                {status === 'pending' && ` (${referredUsers.filter(u => u.status === 'pending').length})`}
                {status === 'converted' && ` (${referredUsers.filter(u => u.status === 'converted').length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <motion.div
          className="space-y-3"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {displayedUsers.map((user) => (
              <motion.div
                key={user.id}
                variants={itemVariants}
                layout
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-background rounded-full">
                    <span className="text-sm font-medium text-foreground">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                  <div className={cn(
                    'flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium',
                    getStatusColor(user.status)
                  )}>
                    {getStatusIcon(user.status)}
                    <span>{getStatusText(user.status)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less Button */}
        {filteredUsers.length > 5 && (
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  Show Less
                  <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Show More ({filteredUsers.length - 5} remaining)
                  <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* Stats Summary */}
        <motion.div
          className="mt-6 pt-6 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                {referredUsers.filter(u => u.status === 'converted').length}
              </p>
              <p className="text-xs text-muted-foreground">Converted</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">
                {referredUsers.filter(u => u.status === 'pending').length}
              </p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};
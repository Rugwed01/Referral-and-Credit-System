/**
 * Product Card Component
 * Card component for displaying products with purchase functionality
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, DollarSign } from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { Product } from '@/types';
import { cn } from '@/utils/cn';

interface ProductCardProps {
  product: Product;
  onPurchase: (productId: string) => void;
  loading?: boolean;
  className?: string;
}

const cardVariants = {
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
  hover: {
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 20,
    },
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPurchase,
  loading = false,
  className,
}) => {
  const [imageError, setImageError] = useState(false);

  const handlePurchase = () => {
    onPurchase(product.id);
  };

  const generateRating = () => {
    // Generate a random rating for demo purposes
    return (Math.random() * 1.5 + 3.5).toFixed(1);
  };

  const rating = generateRating();

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      layout
    >
      <Card variant="elevated" className={cn('overflow-hidden group', className)}>
        {/* Product Image */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          {!imageError ? (
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              variants={imageVariants}
              whileHover="hover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full border border-border">
              {product.category}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-1 px-2 py-1 text-xs font-medium bg-background/90 backdrop-blur-sm rounded-full border border-border">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{rating}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Title and Description */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="text-2xl font-bold text-foreground">
                {product.price}
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <Button
            className="w-full"
            onClick={handlePurchase}
            loading={loading}
            disabled={loading}
            size="lg"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Purchase Now
              </>
            )}
          </Button>

          {/* Additional Info */}
          <motion.div
            className="mt-4 pt-4 border-t border-border"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="opacity-0"
          >
            <p className="text-xs text-muted-foreground text-center">
              Instant access • 30-day money-back guarantee • 24/7 support
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};
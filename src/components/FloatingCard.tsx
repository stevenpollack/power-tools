import React from 'react';

interface FloatingCardProps {
  review: {
    id: string;
    authorName: string;
    toolName: string;
    excerpt: string;
    mood: string;
    readingTime: number;
  };
  featured?: boolean;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({ review, featured = false }) => {
  return (
    <div className={`floating-card ${featured ? 'featured' : ''}`}>
      <div className="card-content">
        <p className="review-excerpt">{review.excerpt}</p>
        <div className="card-metadata">
          <span className="author">{review.authorName}</span>
          <span className="tool">{review.toolName}</span>
          <span className="reading-time">{review.readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}; 
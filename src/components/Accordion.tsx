import {
  Accordion as BaseAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReviewsSection } from "./reviews/reviews-section";
import { CheckIcon } from "lucide-react";

// Define the Review type for this component
type TransformedReview = {
  rating: number;
  recommendsProduct: boolean;
  helpfulVotes: number;
  unhelpfulVotes: number;
  verifiedPurchaser: boolean;
  displayName: string;
  useCase: string;
  userCategory: string;
  content: string;
  dateCreated: string;
  qualityRating: number;
  valueRating: number;
};

interface Props {
  data: {
    trigger: string;
    content: React.ReactNode;
  }[];
}

export function Accordion({ data }: Props) {
  return (
    <BaseAccordion type="single" collapsible className="w-full">
      {data.map((item, i) => {
        return (
          <AccordionItem value={`item-${i.toFixed()}`}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </BaseAccordion>
  );
}

function ToolFeatures({
  features,
  description,
}: {
  features: string[];
  description: string;
}) {
  return (
    <div className="bg-white p-4">
      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon className="text-bunnings-primary-green mt-0.5 h-4 w-4 flex-shrink-0" />
            <span className="text-sm leading-relaxed text-gray-700">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Accordion2({
  keyFeatures,
  description,
  reviews,
  totalReviews,
  averageRating,
  ratingDistribution,
  averageQualityRating,
  averageValueRating,
}: {
  keyFeatures: string[];
  description: string;
  reviews: TransformedReview[];
  totalReviews: number;
  averageRating: number;
  ratingDistribution: Record<1 | 2 | 3 | 4 | 5, number>;
  averageQualityRating: number;
  averageValueRating: number;
}) {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
      <BaseAccordion type="single" collapsible className="w-full">
        <AccordionItem value="features" className="border-b border-gray-200">
          <AccordionTrigger className="relative flex items-center pl-6 text-xl font-extrabold text-bunnings-primary-green hover:no-underline lg:text-2xl">
            <div className="absolute left-0 top-0 h-8 w-2 bg-bunnings-primary-red lg:top-1"></div>
            Features
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <ToolFeatures features={keyFeatures} description={description} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ratings-reviews">
          <AccordionTrigger className="relative flex items-center pl-6 text-xl font-extrabold text-bunnings-primary-green hover:no-underline lg:text-2xl">
            <div className="absolute left-0 top-0 h-8 w-2 bg-bunnings-primary-red lg:top-1"></div>
            Ratings & Reviews
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <ReviewsSection
              reviews={reviews}
              totalReviews={totalReviews}
              averageRating={averageRating}
              ratingDistribution={ratingDistribution}
              averageQualityRating={averageQualityRating}
              averageValueRating={averageValueRating}
            />
          </AccordionContent>
        </AccordionItem>
      </BaseAccordion>
    </div>
  );
}

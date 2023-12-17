import { useMemo, useState } from "react";

import { useRouter } from "next/router";

import FormStep from "./form-step";

import CategoryTree from "@app/components/category-tree";
import type { ProductFormData } from "@app/hooks/queries/use-product-by-id-query";
import { getCategoryId } from "@app/utils/param-ids";
import type { Tab } from "@crab-stash/ui";
import { useToast } from "@crab-stash/ui";
import { Button, Tabs } from "@crab-stash/ui";

export type ProductCreatorStep = "category" | "form";

interface ProductCreatorProps {
  formData?: ProductFormData;
}

function ProductCreator({ formData }: ProductCreatorProps) {
  const [currentStep, setCurrentStep] = useState<ProductCreatorStep>(
    formData ? "form" : "category",
  );
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const { toast } = useToast();
  const { query } = useRouter();
  const queryCategoryId = getCategoryId(query) as string;

  const changeStep = (step: ProductCreatorStep) => {
    if (step === "form" && selectedPath.length === 0) {
      toast({
        title: "Please select a category",
        description: "You need to select a category before you can continue",
        variant: "destructive",
      });

      return;
    }

    setCurrentStep(step);
  };

  const tabs: Tab<ProductCreatorStep>[] = useMemo(
    () => [
      {
        label: "Pick category",
        value: "category",
        onClick: (value) => changeStep(value),
        content: (
          <div className="flex flex-col">
            <CategoryTree
              onClick={(path) => {
                setSelectedPath(path);
              }}
              selectedPath={selectedPath}
              highlightOnlyPath
              asButton
            />
            <Button
              className="w-full mt-4"
              onClick={() => {
                changeStep("form");
              }}
            >
              Next
            </Button>
          </div>
        ),
      },
      {
        label: "Fill out product information",
        onClick: (value) => changeStep(value),

        value: "form",
        content: (
          <FormStep
            formData={formData}
            categoryId={formData ? queryCategoryId : selectedPath[selectedPath.length - 1]}
          />
        ),
      },
    ],
    [selectedPath, setSelectedPath, setCurrentStep],
  );

  return (
    <Tabs
      tabs={tabs}
      defaultValue="basic-information"
      value={currentStep}
      className="flex flex-col"
      tabsClassName="w-fit align-center mx-auto flex-wrap h-fit"
      readonly={!!formData}
    />
  );
}

export default ProductCreator;

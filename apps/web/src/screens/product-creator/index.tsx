import { useMemo, useState } from "react";

import FormStep from "./form-step";

import CategoryTree from "@app/components/category-tree";
import type { Tab } from "@crab-stash/ui";
import { useToast } from "@crab-stash/ui";
import { Button, Tabs } from "@crab-stash/ui";

export type ProductCreatorStep = "category" | "form";

function ProductCreator() {
  const [currentStep, setCurrentStep] = useState<ProductCreatorStep>("category");
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const { toast } = useToast();

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
        content: <FormStep categoryId={selectedPath[selectedPath.length - 1]} />,
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
    />
  );
}

export default ProductCreator;

import AdditionalInformation from "./steps/additional-information";
import BasicInformation from "./steps/basic-information";
import LogoUploader from "./steps/logo";
import type { WarehouseCreateStepFormId, WarehouseCreatorStep } from "./types";
import { useWarehouseCreatorStore } from "./warehouse-creator-store";

import PageTitle from "@app/components/page-title";
import type { Tab } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";
import { Card, Tabs } from "@crab-stash/ui";

const tabs: Tab<WarehouseCreatorStep>[] = [
  {
    label: "Basic Information",
    value: "basic-information",
    content: <BasicInformation />,
  },
  {
    label: "Logo",
    value: "logo",
    content: <LogoUploader />,
  },
  {
    label: "Additional Information",
    value: "additional-information",
    content: <AdditionalInformation />,
  },
];

function WarehouseCreator() {
  const { currentStep, goToPreviousStep } = useWarehouseCreatorStore((state) => ({
    currentStep: state.step,
    goToPreviousStep: state.goToPreviousStep,
  }));

  const currentStepFormId: WarehouseCreateStepFormId = `${currentStep}-form`;

  return (
    <div className="flex-1">
      <PageTitle>Warehouse Creator</PageTitle>
      <Card
        title="Create a new warehouse"
        description="In this process, you will be prompted to enter required information to create a new warehouse."
      >
        <Tabs
          tabs={tabs}
          defaultValue="basic-information"
          value={currentStep}
          readonly
          className="flex flex-col"
          tabsClassName="w-fit align-center mx-auto flex-wrap h-fit"
        />
        <div className="flex justify-end space-x-4 mt-8">
          <Button variant="secondary" onClick={goToPreviousStep}>
            Previous
          </Button>
          <Button type="submit" form={currentStepFormId}>
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default WarehouseCreator;

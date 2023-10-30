import { useMemo } from "react";

import BasicInformation from "./steps/basic-information";
import type { WarehouseCreateStepFormId, WarehouseCreatorStep } from "./types";
import useWarehouseCreatorNavigation from "./use-warehouse-creator-navigation";

import PageTitle from "@app/components/page-title";
import type { Tab } from "@crab-stash/ui";
import { Button } from "@crab-stash/ui";
import { Card, Tabs } from "@crab-stash/ui";

function WarehouseCreator() {
  const { currentStep, goToPreviousStep } = useWarehouseCreatorNavigation();

  const currentStepFormId: WarehouseCreateStepFormId = `${currentStep}-form`;

  const tabs: Tab<WarehouseCreatorStep>[] = useMemo(
    () => [
      {
        label: "Basic Information",
        value: "basic-information",
        content: <BasicInformation />,
      },
      {
        label: "Logo",
        value: "logo",
        content: <>Logo</>,
      },
      {
        label: "Additional Information",
        value: "additional-information",
        content: <>Additional Information</>,
      },
    ],
    [],
  );

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
          className="my-auto"
          value={currentStep}
          readonly
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

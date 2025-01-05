import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  onUpload: (results: any) => void;
};
/* eslint-disable @typescript-eslint/no-explicit-any */

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  return (
    /* eslint-disable @typescript-eslint/no-explicit-any */
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
    /* eslint-disable @typescript-eslint/no-explicit-any */
  );
};

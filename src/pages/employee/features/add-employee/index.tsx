import { SingleImageUpload } from "@/components/common/SingleImageUpload";
import React from "react";

const AddEmployeePage = () => {
  return (
    <div>
      <SingleImageUpload
        oldImage="http://localhost:3000/uploads/images/1775305223526.jpg"
        onImageUpload={(e) => {}}
        onDeleteImage={() => {}}
      />
    </div>
  );
};

export default AddEmployeePage;

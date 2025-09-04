import React, { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopup from "./EmojiPickerPopup";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing && initialCategoryData) {
        setCategory(initialCategoryData);
    } else {
        setCategory({name: "", type: "", icon: ""});
    }

  }, [isEditing, initialCategoryData])

  const categoryTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onAddCategory(category);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div>
        <EmojiPickerPopup
          icon={category.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
      </div>

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeholder="e.g. Freelance, Salary, Groceries"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        options={categoryTypeOptions}
      />

      <div className="flex justify-end mt-6">
        <button
          disabled={loading}
          type="button"
          onClick={handleSubmit}
          className="bg-purple-500 rounded-lg py-1 px-2"
        >
          {loading ? (
            <>
              <LoaderCircle className="w-4 h-4 animate-spin" />
              {isEditing ? "Updating..." : "Adding..."}     
            </>
          ) : (
            <> {isEditing ? "Update Category" : "Add Category"}</>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCategoryForm;

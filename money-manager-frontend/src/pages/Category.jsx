import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import { axiosConfig } from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
  useUser();

  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory = async (category) => {
    const {name, type, icon} = category;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    //check if the category already exists
    const isDuplicate = categoryData.some((category) => {
      return category.name.toLowerCase() === name.trim().toLowerCase();
    })
    if (isDuplicate) {
      toast.error("Category name already exists");
    }

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
        name, type, icon
      });

      if (response.status === 201) {
        toast.success("Category added successfully");
        setOpenAddCategoryModal(false);
        fetchCategoryDetails();
      }
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const handleEditCategory = (categoryToEdit) => {
    setSelectedCategory(categoryToEdit);
    setOpenEditCategoryModal(true);
  }

  const handleUpdateCategory = async (updatedCategory) => {
    const {id, name, type, icon} = updatedCategory;

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    if (!id) {
      toast.error("Category Id is missing for update");
      return;
    }

    try {
      const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {
        name, type, icon
      })
      setOpenEditCategoryModal(false);
      setSelectedCategory(null);
      toast.success("Category updated successfully");
      fetchCategoryDetails();
    } catch (error) {
      console.log("Error updating category: ", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Failed to update category");
    }

  }

  const handleDeleteCategory = async (categoryToDelete) => {
  if (!categoryToDelete?.id) {
    toast.error("Category Id is missing for delete");
    return;
  }

  try {
    const response = await axiosConfig.delete(
      API_ENDPOINTS.DELETE_CATEGORY(categoryToDelete.id)
    );

    if (response.status === 200) {
      toast.success("Category deleted successfully");
      fetchCategoryDetails();
    }
  } catch (error) {
    console.error("Error deleting category: ", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Failed to delete category");
  }
};

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        {/* Add button to add catagory */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>

          <button
            onClick={() => setOpenAddCategoryModal(true)}
            className="bg-green-500 flex items-center gap-1 rounded px-3 py-1 text-white"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>

        {/* Category list */}
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} onDeleteCategory={handleDeleteCategory}/>

        {/* Adding category modal */}
        <Modal
          isOpen={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          title="Add Category"
        >
          <AddCategoryForm onAddCategory={handleAddCategory} />
        </Modal>

        {/* updating category modal */}
        <Modal
        isOpen={openEditCategoryModal}
        onClose={() => {setOpenEditCategoryModal(false); 
          setSelectedCategory(null);}}
        title={"Update Category"}
        >
          <AddCategoryForm
          initialCategoryData={selectedCategory}
          onAddCategory={handleUpdateCategory}
          isEditing={true}
          />

        </Modal>
      </div>
    </Dashboard>
  );
};

export default Category;

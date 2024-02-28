import axios from "axios";

// sample data from the backend server (express) is imported here for testing purposes only
export const getItems = async () => {
    const { data } = await axios.get("/api/products");
    return data;
};

// this function is used to search for items in the sample_data array
// search items by name or brand
export const search = async (searchTerm) => {
    const { data } = await axios.get(`/api/products/search/${searchTerm}`);
    return data;
};

// this function is used to get the categories from the sample_categories array
export const getCategory = async () => {
    const { data } = await axios.get("/api/products/categories");
    return data;
};

// this function is used to get items by category from the sample_data array
export const getByCategory = async (categoryName) => {
    if (categoryName === "All") return getItems();
    const { data } = await axios.get(`/api/products/category/${categoryName}`);
    return data;
};

// this function is used to get an item by id from the sample_data array
export const getItemById = async (itemId) => {
    const { data } = await axios.get(`/api/products/${itemId}`);
    return data;
};



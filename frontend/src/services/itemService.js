import { sample_data } from "../data";

// This function is used to get the items from the sample_data array
export const getItems = async () => sample_data;

// this function is used to search for items in the sample_data array
export const search = async (searchTerm) => 
    sample_data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );



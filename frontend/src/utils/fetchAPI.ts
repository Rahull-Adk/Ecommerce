import axios from "axios";

const Main_URL = "https://fakestoreapi.com";

export interface IProducts {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const buildURL = (endpoint: string, limit?: number): string => {
  const url = new URL(`${Main_URL}/${endpoint}`);
  if (limit) {
    url.searchParams.append("limit", limit.toString());
  }
  return url.toString();
};

export async function getAllProducts(limit?: number) {
  try {
    const url = buildURL("products", limit);

    // fetch the url using axios library
    const products = await axios.get<IProducts[]>(url);

    return products.data;
    
  } catch (error) {
    throw error;
  }
}

// for product detail component
export async function getSpecificProducts(id: string) {
  try {
    const url = buildURL(`products/${id}`);

    const products = await axios.get<IProducts>(url);

    return products.data;
  } catch (err) {
    console.log("Fetching product failed!");
  }
}

export async function getCategories() {
  try {
    const url = buildURL(`products/categories`);
    const products = await axios.get(url);
    return products.data;
  } catch (error) {
    throw error;
  }
}

export async function getSpecifiCategory(query: string) {
  try {
    const url = buildURL(`products/category/${query}`);
    const products = await axios.get(url);
    return products.data;
  } catch (error) {
    throw error;
  }
}

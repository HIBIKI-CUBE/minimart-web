import { graphqlRequest } from "./graphqlClient";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};

const listProductsQuery = `
  query listProducts {
    products {
      id
      name
      description
      price
      imageUrl
    }
  }
  `,
  getProductQuery = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        name
        price
        imageUrl
        description
      }
    }
  `
;

export async function listProducts(): Promise<Product[]> {
  const data = await graphqlRequest({ query: listProductsQuery });
  return data.products;
}

export async function getProduct(id: string): Promise<Product> {
  const productData = await graphqlRequest({ query: getProductQuery, variables: { id } });
  return productData.product;
}
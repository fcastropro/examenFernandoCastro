import type { PaginatedResponse, Product } from "../types/product";
import { http } from "./http";

export async function getProducts(params: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  const { page, pageSize, search } = params;

  const res = await http.get<PaginatedResponse<Product>>("/aspirantes/", {
    params: {
      page,
      page_size: pageSize,
      ...(search ? { search } : {}),
    },
  });

  return res.data;
}
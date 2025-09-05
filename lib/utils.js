import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getPageNumbers(currentPage, totalPages) {
  const pages = [];
  pages.push(1);

  if (currentPage > 3) {
    pages.push("ellipsis-left");
  }

  for (
    let i = Math.max(2, currentPage - 2);
    i <= Math.min(totalPages - 1, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage < totalPages - 2) {
    pages.push("ellipsis-right");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}

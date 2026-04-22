const formatCategory = (category) => {
    category = category.charAt(0).toUpperCase() + category.slice(1);
    category = category.replace("-", " ");
    return category;
}

export default formatCategory;
export interface Category {
    id: string;
    name: string;
    link: string;
    image?: string;
    icon?: string;
}

// These categories represent the mobile "Nos univers" menu.
// They can be modified in the admin page later.
export const mobileMenuCategories: Category[] = [
    {
        id: "appareil-reconditionne",
        name: "Appareil reconditionné",
        link: "/product",
        icon: "recycling",
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        id: "gros-electromenager",
        name: "Gros électroménager",
        link: "/product",
        icon: "kitchen",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        id: "cuisine-cuisson",
        name: "Cuisine et cuisson",
        link: "/product",
        icon: "microwave",
        image: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        id: "maison-entretien",
        name: "Maison - Entretien - Jardin",
        link: "/product",
        icon: "cleaning_services",
        image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        id: "beaute-sante",
        name: "Beauté - Santé",
        link: "/product",
        icon: "health_and_beauty",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=200&h=200&auto=format&fit=crop"
    },
    {
        id: "tv-image-son",
        name: "Tv - Image - Son",
        link: "/product",
        icon: "tv",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&h=200&auto=format&fit=crop"
    }
];

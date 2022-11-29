export const Menulist = [
    {
        title:"Pazar Yerleri",
        url:"/marketplaces/list",
        subMenus:[
                {
                    title:"Pazar Yeri Ekle",
                    url:"/marketplaces/add"
                },
                {
                    title:"Pazar Yeri Listele",
                    url:"/marketplaces/list"
                }
            ]
    },
    {
        title:"Ürünler",
        url:"/products",
        subMenus: [
            {
                title: "Ürünler",
                url: "/products"
            }
        ]
    },
    {
        title:"Ana Sayfa",
        url:"/"
    },
    {
        title:"Kullanıcı",
        url:"/user",
        subMenus: [
            {
                title: "Çıkış Yap",
                url: "/logout"
            },
            {
                title: "Kullanıcı Ayarları",
                url: "/info"
            }
        ]
    }
];
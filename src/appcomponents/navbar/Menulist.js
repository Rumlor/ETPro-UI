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
                },
                {
                    title:"Satış Yardımcısı",
                    url:"/marketplaces/tool"
                }
            ]
    },
    {
        title:"Ürünler",
        url:"/products/add",
        subMenus: [
            {
                title: "Ürün Excel",
                url: "/products/calculate"
            },
            {
                title: "Ürün Tanımlama",
                url: "/products/add"
            },
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
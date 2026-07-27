import type { WeddingData } from "@/types";

export const WEDDING_DATA: WeddingData = {
  couple: {
    partner1: "ლინდა",
    partner2: "სულხანი",
    initials: "ლ & ს",
    tagline: "ორი სული, ერთი უკვდავი გზა",
  },
  date: "2026-09-13T16:00:00",
  dateFormatted: "2026 წლის 13 სექტემბერი",
  venue: {
    ceremony: {
      name: "რენესანსი",
      address: "ფრიდონ ხალვაშის გამზირი 83",
      city: "ბათუმი, საქართველო",
      time: "16:00",
      coordinates: { lat: 41.6205, lng: 41.6012 },
      description:
        "ელეგანტური საბანკეტო დარბაზი, სადაც ჩვენი ახალი თავი იწყება.",
    },
    reception: {
      name: "რენესანსი",
      address: "ფრიდონ ხალვაშის გამზირი 83",
      city: "ბათუმი, საქართველო",
      time: "19:00",
      coordinates: { lat: 41.6205, lng: 41.6012 },
      description:
        "საღამო სიყვარულით, მუსიკითა და ცეკვით — თქვენთან ერთად.",
    },
  },
  dressCode: "სადღესასწაულო ჩაცმულობა · რბილი და ელეგანტური ტონები მისასალმებელია",
  schedule: [
    {
      time: "15:30",
      title: "სტუმრების მისვლა",
      description: "მისალმება და მისასალმებელი სასმელი",
    },
    {
      time: "16:00",
      title: "ცერემონია",
      description: "ფიცის დადება დარბაზში",
    },
    {
      time: "17:30",
      title: "კოქტეილის საათი",
      description: "კანაპეები და ფოტოები",
    },
    {
      time: "19:00",
      title: "რეცეპცია",
      description: "ვახშამი, ტოსტები და ზეიმი",
    },
    {
      time: "23:00",
      title: "პირველი ცეკვა",
      description: "მომენტი, სიყვარულით სავსე",
    },
  ],
  loveStory: [
    {
      id: "chapter-1",
      year: "2019",
      title: "შემთხვევითი შეხვედრა",
      content:
        "ერთი შეხვედრა საკმარისი იყო, რომ ორმა გულმა ერთმანეთი ამოიცნო. იმ დღიდან ყველაფერი შეიცვალა.",
      image: "/uploads/couple-1.jpg",
      accent: "ბათუმი",
    },
    {
      id: "chapter-2",
      year: "2021",
      title: "ერთად გაზრდილი ოცნებები",
      content:
        "წლები გავიდა სიცილით, მოგზაურობებითა და უთვალავი საღამოებით ერთად — და სიყვარული უფრო ღრმა გახდა.",
      image: "/uploads/couple-2.jpg",
      accent: "ჩვენი გზა",
    },
    {
      id: "chapter-3",
      year: "2024",
      title: "შეთავაზება",
      content:
        "იმ მომენტში, როცა სულხანმა კითხვა დასვა, ლინდას გულმა უკვე იცოდა პასუხი — «კი».",
      image: "/uploads/couple-4.jpg",
      accent: "უკვდავი «კი»",
    },
    {
      id: "chapter-4",
      year: "2026",
      title: "ჩვენი ქორწილი",
      content:
        "ახლა გიწვევთ, იყოთ ჩვენი ისტორიის მოწმენი — სიყვარულის, ოჯახისა და ლამაზი ცხოვრების ზეიმზე, რომელსაც ერთად ვიზეიმებთ.",
      image: "/uploads/couple-3.jpg",
      accent: "13 სექტემბერი",
    },
  ],
  gallery: [
    {
      id: "g1",
      src: "/uploads/couple-3.jpg",
      alt: "ლინდა და სულხანი",
      width: 800,
      height: 1200,
    },
    {
      id: "g2",
      src: "/uploads/couple-4.jpg",
      alt: "რომანტიკული მომენტი",
      width: 800,
      height: 1200,
    },
    {
      id: "g3",
      src: "/uploads/couple-1.jpg",
      alt: "ზღვის პირას",
      width: 800,
      height: 1200,
    },
    {
      id: "g4",
      src: "/uploads/couple-2.jpg",
      alt: "ერთად",
      width: 800,
      height: 1200,
    },
  ],
  quote: {
    text: "სიყვარული არ არის იმაში, რამდენი დღე, თვე თუ წელი გავატარეთ ერთად. სიყვარული არის იმაში, რამდენად გვიყვარს ერთმანეთი ყოველ დღე.",
    author: "უცნობი",
  },
  social: [
    { platform: "instagram", url: "#", label: "Instagram" },
    { platform: "pinterest", url: "#", label: "Pinterest" },
  ],
  music: {
    title: "Clair de Lune",
    artist: "Debussy",
    src: "/audio/ambient-piano.mp3",
  },
  images: {
    hero: "/uploads/couple-3.jpg",
    finale: "/uploads/couple-4.jpg",
    preloader: "/uploads/couple-4.jpg",
  },
};

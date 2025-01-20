# DogGO Frontend Task

Bu proje, DogGO Frontend görev değerlendirmesi için geliştirilmiş bir sosyal medya uygulamasıdır.

## 🚀 Özellikler

-   **Ana Sayfa**: Post akışı, arama özelliği ve yeni post paylaşma
-   **Explore**: Etiketlere göre post filtreleme
-   **Bookmarks**: Kaydedilen postları görüntüleme
-   **Profil**: Kullanıcı postlarını listeleme
-   **Sidebar**: Responsive tasarım, mobilde menü olarak açılma

## 💻 Teknolojiler ve Kullanım Alanları

-   Next.js 14 (Routing, Ve performans optimizasyonları için)
-   TypeScript (Tip güvenliği ve daha iyi geliştirici deneyimi için)
-   Redux Toolkit (Post beğenme, kaydetme gibi global state yönetimi için)
-   Tailwind CSS (Responsive ve modern UI tasarımı için)
-   JSON Server (Post ve kullanıcı verilerini simüle eden mock API için)

## 🛠️ Kurulum

1. Projeyi klonlayın:

```bash
git clone [repo-url]
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. JSON Server'ı başlatın:

```bash
npm run json-server
```

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

## 🌟 Özellikler Detayı

### Ana Sayfa

-   Post akışı (en yeniden en eskiye)
-   Post içeriklerinde arama (1.5 sn debounce)
-   Yeni post paylaşma
-   Post detayında yorumları görüntüleme
-   Post beğenme ve kaydetme

### Explore

-   Etiketlere göre filtreleme
-   Çoklu etiket seçimi
-   Infinite scroll ile sayfalama

### Bookmarks

-   Kaydedilen postları görüntüleme
-   Kayıtları kaldırma

### Profil

-   Kullanıcının paylaştığı postları listeleme
-   Infinite scroll ile sayfalama

## 🔧 Teknik Detaylar

### State Yönetimi

-   Redux Toolkit ile merkezi state yönetimi
-   Post ve bookmark durumları için ayrı slice'lar
-   Async işlemler için thunk middleware: Redux Toolkit'in thunk middleware'i, API çağrıları gibi asenkron işlemleri yönetmek için kullanılır. Bu sayede API istekleri, veri yükleme durumları ve hata yönetimi merkezi olarak kontrol edilebilir.

### Performans Optimizasyonları

-   Debounced search: Arama inputuna yazılan her karakterde istek atmak yerine, kullanıcı yazmayı bitirdikten 1.5 saniye sonra arama yapılır. Bu sayede gereksiz API istekleri önlenir.
-   Infinite scroll: Sayfa sonuna gelindiğinde Intersection Observer API kullanılarak yeni postlar otomatik yüklenir. Bu sayede tüm postların tek seferde yüklenmesi engellenir ve performans artar.
-   Önbelleğe alma stratejileri

### Responsive Tasarım

-   Mobile-first yaklaşım
-   Tüm ekran boyutlarına uyumlu tasarım
-   Tailwind CSS ile esnek layout

## 🚦 API Endpoints

-   `GET /posts?_sort=timestamp&_order=desc`: Tüm postları tarihe göre sıralayarak getir
-   `GET /posts?q={query}&_sort=timestamp&_order=desc`: Post içeriklerinde arama yap ve sonuçları tarihe göre sırala
-   `POST /posts`: Yeni post oluştur (timestamp otomatik eklenir)
-   `GET /posts?username={username}&_sort=timestamp&_order=desc`: Kullanıcı postlarını tarihe göre sıralayarak getir
-   `GET /posts?_page={page}&_limit={limit}`: Sayfalama için kullanılır, her sayfada belirli sayıda post getirir

## 🔗 Faydalı Linkler

-   [Figma Tasarımı](https://www.figma.com/design/GTtrjzfO78hIUx0iXF8OhW/Doggo-FrontEnd-Task?node-id=371-3418&t=cq3ewo3a4uMk6DBe-1)

## 👨‍💻 Geliştirici Notları

### Karşılaşılan Zorluklar ve Çözümler

1. **Redux Immutability**: Comment tiplerinde yaşanan immutability sorunları için özel tip tanımlamaları ve dönüşümler uygulandı.
2. **Infinite Scroll**: Intersection Observer API kullanılarak performanslı bir sonsuz scroll implementasyonu yapıldı.
3. **Type Güvenliği**: TypeScript kullanarak değişken tiplerini önceden belirleyip, kod yazarken ve çalışırken oluşabilecek tip hatalarını engellemeye çalıştım.
4. **Bookmark Özelliği**: Zaman kısıtından dolayı bookmark'ları kalıcı olarak kaydetme özelliği tam olarak implemente edilemedi. Şu an için bookmarklar sadece uygulama açık olduğu sürece saklanıyor ve sayfa yenilendiğinde kayboluyor. İleride localStorage veya backend entegrasyonu ile bu sorun çözülebilir.

### Zaman Yönetimi

-   İlk gün: Temel yapı ve ana sayfa implementasyonu
-   İkinci gün: Explore ve Bookmarks sayfaları
-   Üçüncü gün: Profil sayfası ve genel iyileştirmeler
-   Son gün: Bug fixes, dokümantasyon, eslint ve build süreçleri. Özellikle eslint ve build süreçlerini ilk defa kullandığım için bu aşamada zorlandım ve süreç beklenenden uzun sürdü.

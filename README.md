## Başlarken

Uygulamayı çalıştırmak için aşağıdaki komutların herhangi birisini çalıştırabilirsin:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Görev

[Figma](https://www.figma.com/design/GTtrjzfO78hIUx0iXF8OhW/Doggo-FrontEnd-Task?node-id=371-3418&t=cq3ewo3a4uMk6DBe-1) linkindeki tasarımı olabildiğince aslına uygun bir şekilde gerçekleştirmeni talep ediyoruz. Açıklığa kavuşturmak için:

- Tasarım responsive olmalıdır. Tasarım büyük, orta ve küçük ölçekli cihazlar için ayrı ayrı verilmiş durumdadır.
- Tasarım yalnızca ana sayfa tasarımını içermektedir. Bunun dışında 3 farklı sayfanın daha geliştirilmesi beklenmektedir: `#Explore`, `Bookmarks` ve `Profile`. Buradaki tasarım adaya bırakılmıştır ancak var olan tasarımla uyumlu olması beklenmektedir.
- `#Exlore` sayfası postları etiketler aracılığıyla bulmak ve göstermek içindir.
- `Bookmarks` daha önce beğenilen postları listelemek içindir.
- `Profile` daha önce kişi tarafından paylaşılmış postları listelemek içindir.
- Bu sayfalar arasında dolaşabilmek istiyoruz.
- `Bookmarks` ve `Profile` sayfalarının içeriklerinin `redux` (`redux`, `redux-toolkit` farketmez) ile yönetilmesi beklenmektedir. Bir post'u beğendiğimizde ya da yeni bir post yayınladığımızda bunların redux'a kayıt edilmesi ve gerektiğinde de redux'tan çekilip gösterilmesi gerekmektedir.
- `Ana sayfa` bir akış ekranıdır. Postlar burada en güncel olandan, en eski olana doğru listelenmelidir. Post'a tıkladığımızda bu post'a yapılmış yorumları görebilmeliyiz.
- Bu ekranın verisi `data` klasörünün altındaki `post_dataset.json` dosyasına dayanmalıdır. Bir fake json API oluşturulup (`json-server` kütüphanesi kullanılabilir) bu sunucuya istek atılarak veriler çekilmelidir.
- `Ana sayfa`da geliştirilmesi beklenen bir diğer işlevsellik ise `Search`'dür. Yazmayı bitirdikten yaklaşık `1500ms` sonra post içerikleri arasında yazılan kelime/cümle aranmalı ve böyle bir içerik mevcutsa akış içerisindeki veriler ile bunlar yer değiştirmelidir. `Search` boşsa akış gösterilmelidir.

Community içerisinde geliştirilen tüm kütüphaneler kullanılabilir. Kullanılması zorunlu olan paketler: `nextjs`, `redux`, `typescript` ve `json-server`'dır.

> Projeyi teslim ederken dikkat etmen gereken en önemli şey `eslint` komutunun çalışması ve projenin başarılı bir şekilde `build` almasıdır.
> Sizinle paylaştığımız dosyalar sorunsuz olmayabilir. Şüpheci olup karşılaşılabilecek problemleri de çözmenizi bekliyoruz.

## Daha İyi Ne Olabilir?

- Bileşenlerin, Sayfaların vd. testleri olabilir. Eğer aşinaysan belki bunları bir AI tool'u kullanarak bile yazdırabilirsin! Buna çok mutlu oluruz ^^
- Yazdığın kodu dokümante edebilirsin.
- Karşılaştığın zorlukları bizimle paylaşabilir ve bunlara nasıl çözümler getirdiğini anlatabilirsin.
- Çözüm getiremediğin sorunlar mı var? O zaman bunlar için nasıl araştırmalar yaptın çözmek için hangi adımları izledin, detaylıca bizimle paylaşabilirsin.
- Çalışma programını bizimle paylaşabilirsin. Biliyoruz ki aynı zamanda eğitimine devam ediyorsun. Zamanı yönetmek o kadar da kolay bir iş değil. Zaman yönetimi bizim için de kritik bir öneme sahip. Bu disiplin seni değerlendirirken belki bize de ufak bir fikir verebilir.

## Vercel'e Yükleme ve Teslim

Proje'nin zip dosyasını indirdikten sonra githubda 'initial commit' commiti ile yüklenmesi gerekmektedir, daha sonra proje üzerinde çalışmaya başlanmalıdır. Geliştirmeler main branchten farklı bir branchte yapılmalı son aşamada pull request ile birleşltirilmelidir. Geliştirmeler bittikten sonra github reposu `muhammeddeniz`, `bahtiyarerden` ve `baris-karan` paylaşılmalıdır.

Next.js uygulamasını yüklemenin en basit yolu [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) platformunu kullanmaktır.

Projenin Vercel'e yüklenerek eğer varsa projeye dair notlarınla birlikte preview linkinin de README.md dosyasına koyulmasını bekliyoruz. Aşağıdaki alan senin için!

## Notlar ve Linkler

Preview Linki:

# E-commerce Backend

Spring Boot ile yazılmış API. Frontend'in kullandığı Workintech API'si ile aynı uçları verir.

## Çalıştırma

```bash
cd backend
JAVA_HOME=$(/usr/libexec/java_home -v 17) mvn spring-boot:run
```

API http://localhost:8080 adresinde açılır. İlk açılışta örnek roller, kategoriler, ürünler ve test kullanıcıları eklenir.

Test kullanıcısı: `customer@commerce.com` / `123456`

## Uçlar

| Metot | Adres | Açıklama |
|---|---|---|
| GET | /roles | Roller |
| POST | /signup | Kayıt |
| POST | /login | Giriş, token döner |
| GET | /verify | Token doğrulama (Authorization header) |
| GET | /categories | Kategoriler |
| GET | /products | Ürünler: category, filter, sort, limit, offset |
| GET | /products/{id} | Tek ürün |
| GET, POST, PUT | /user/address | Adresler |
| DELETE | /user/address/{id} | Adres sil |
| GET, POST, PUT | /user/card | Kartlar |
| DELETE | /user/card/{id} | Kart sil |
| GET, POST | /order | Siparişler |

## Frontend'i bu API'ye bağlamak

Proje ana klasöründe `.env.local` dosyası oluşturup şunu yaz, sonra `npm run dev`'i yeniden başlat:

```
VITE_API_URL=http://localhost:8080
```

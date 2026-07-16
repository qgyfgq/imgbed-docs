# Dodawanie kanału Cloudflare R2

## Kiedy warto go użyć

Użyj Cloudflare R2, gdy:

- Twoja strona ImgHost działa już w Cloudflare i chcesz przechowywać pliki w buckecie R2 na tym samym koncie Cloudflare.
- Nie chcesz konfigurować osobnego endpointu S3, access key i secret key.
- Odczyt i zapis mają przechodzić przez binding R2 w Worker lub Pages przy minimalnej konfiguracji.

W skrócie:

Kanału R2 nie tworzy się ręcznie w panelu administracyjnym ImgHost. Najpierw trzeba powiązać bucket R2 z projektem Cloudflare, a nazwa zmiennej bindingu musi brzmieć dokładnie `img_r2`.

## Co przygotować przed rozpoczęciem

- Konto Cloudflare.
- Istniejący bucket R2.
- Uprawnienia do zarządzania projektem Cloudflare, na którym wdrożony jest ImgHost.

## Konfiguracja w Cloudflare

### 1. Utwórz bucket R2

1. Zaloguj się do Cloudflare Dashboard.
2. Otwórz `R2 Object Storage`.
3. Kliknij Create bucket.
4. Wybierz nazwę bucketu, na przykład `imgbed`.

W tym buckecie będą przechowywane przesłane pliki.

![Utwórz bucket R2](../../image/upload/cloudflare-r2/创建一个存储桶img-r2.png)

### 2. Powiąż bucket z projektem ImgHost

Wybierz miejsce bindingu zgodnie z typem wdrożenia:

| Typ wdrożenia | Miejsce bindingu |
| --- | --- |
| Pages | Bieżący projekt Pages -> Settings -> Functions -> R2 bucket bindings |
| Worker | Bieżący Worker -> Settings -> Bindings -> R2 bucket bindings |

Podczas dodawania bindingu kluczowe są te pola:

| Pole | Wartość |
| --- | --- |
| Variable name | `img_r2` |
| R2 bucket | Wybierz utworzony bucket |

Nazwa zmiennej musi być dokładnie `img_r2`. Przesyłanie, odczyt i usuwanie plików R2 zależą od tej nazwy bindingu.

### 3. Wdróż projekt ponownie

Po zapisaniu bindingu wdróż ImgHost ponownie, aby runtime Worker lub Pages mógł uzyskać dostęp do `img_r2`.

## Co zobaczysz w ImgHost

Gdy binding R2 będzie dostępny, otwórz:

1. Ustawienia systemowe.
2. Ustawienia przesyłania.
3. Kanał `Cloudflare R2`.

System automatycznie tworzy jeden stały kanał:

| Pole | Stała wartość |
| --- | --- |
| Nazwa kanału | `Cloudflare R2` |
| Typ kanału | `cfr2` |
| Tryb pamięci | `binding` |
| Źródło konfiguracji | Binding środowiskowy |

To stały kanał bindingu. Nie trzeba klikać Dodaj kanał, aby go utworzyć, i nie da się go usunąć jak zwykłego kanału.

## Pola edytowalne w panelu administracyjnym

| Pole | Działanie | Wymagane |
| --- | --- | --- |
| Włącz kanał | Określa, czy R2 bierze udział w wyborze kanału przesyłania. | Tak |
| Account ID | Potrzebne tylko przy włączonych limitach pojemności, gdy trzeba odpytywać oficjalne użycie R2. | Zalecane przy limitach |
| Nazwa bucketu | Potrzebna tylko przy włączonych limitach pojemności, gdy trzeba odpytywać oficjalne użycie R2. | Zalecane przy limitach |
| Limit pojemności | Określa, czy ten kanał R2 jest wybierany na podstawie dostępnej pojemności. | Nie |
| Próg | Zatrzymuje zapis do tego kanału po osiągnięciu podanego procentu użycia. | Wymagane przy limitach |

Account ID możesz skopiować z panelu informacji o koncie w Cloudflare Dashboard. Wypełnij je tylko wtedy, gdy chcesz, aby ImgHost odpytywał i egzekwował użycie limitu R2.

![Pobierz Account ID](../../image/upload/cloudflare-r2/获取账户id.png)

## Kroki konfiguracji

1. Utwórz bucket R2 w Cloudflare.
2. Otwórz ustawienia Cloudflare projektu ImgHost.
3. Dodaj binding bucketu R2.
4. Ustaw `Variable name` na `img_r2`.
5. Wybierz utworzony bucket R2.
6. Zapisz binding i wdróż ImgHost ponownie.
7. Wróć do ImgHost -> Ustawienia systemowe -> Ustawienia przesyłania.
8. Sprawdź, czy kanał `Cloudflare R2` jest widoczny i włączony.

Jeśli R2 ma być wybierany na podstawie pojemności, włącz limit pojemności, a potem wpisz Account ID, nazwę bucketu, limit i próg przed zapisaniem.

![Konfiguracja limitów pojemności](../../image/upload/cloudflare-r2/配置容量限制.png)

## Jak sprawdzić

- Stały kanał `Cloudflare R2` pojawia się w Ustawieniach przesyłania.
- Karta kanału pokazuje, że kanał jest włączony.
- Mały plik testowy przesyła się poprawnie, a zwrócony link otwiera się normalnie.
- Jeśli przy otwieraniu pliku pojawia się `R2 database binding is not configured`, runtime nie otrzymał bindingu `img_r2`. Sprawdź nazwę bindingu w Cloudflare i wdróż projekt ponownie.

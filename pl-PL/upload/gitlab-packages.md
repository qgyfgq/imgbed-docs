# Dodawanie kanału GitLab Packages

## Co przygotować przed rozpoczęciem

Potrzebujesz tylko trzech rzeczy:

| Wymaganie | Cel |
| --- | --- |
| Konto GitLab | Do wygenerowania access token i jako właściciel projektu. |
| GitLab Personal Access Token | Pozwala ImgHost korzystać z GitLab API, tworzyć projekty i przesyłać pliki do Generic Packages. |
| Nazwa projektu | Możesz wpisać samą nazwę projektu, np. `imgbed`. |

## Konfiguracja

### Krok 1: Zaloguj się do GitLab i utwórz Access Token

1. Zaloguj się do GitLab.
2. Kliknij avatar w prawym górnym rogu i otwórz `Preferences`.
3. Otwórz `Access Tokens` z lewego panelu.
4. Nadaj tokenowi rozpoznawalną nazwę.
5. Wybierz datę wygaśnięcia zgodnie z własnym sposobem utrzymania.
6. Zaznacz scope `api`.
7. Skopiuj i zapisz token od razu po utworzeniu.

![Utwórz token legacy](../../image/upload/gitlab-packages/点击生成旧版令牌.png)

![Wybierz uprawnienia tokenu](../../image/upload/gitlab-packages/勾选令牌权限.png)

## Krok 2: Wypełnij kanał GitLab Packages w ImgHost

Po wybraniu `GitLab Packages` w Ustawieniach przesyłania wypełnij:

| Pole UI | Co wpisać |
| --- | --- |
| Nazwa kanału | Nazwa wybrana przez Ciebie, np. `GitLabPrimary`. |
| Access Token | Utworzony przed chwilą GitLab Personal Access Token. |
| Nazwa projektu | Krótka nazwa, np. `imgbed`, albo pełna ścieżka, np. `username/imgbed`. |
| Prywatne repozytorium | Włącz lub wyłącz według potrzeb. |
| Uwaga | Opcjonalnie, np. `Primary upload channel`. |

![Konfiguracja kanału](../../image/upload/gitlab-packages/配置渠道内容.png)

## Krok 3: Zapisz kanał

Po wypełnieniu pól kliknij Zapisz.

System obsłuży te szczegóły:

| Zachowanie systemu | Opis |
| --- | --- |
| Krótka nazwa projektu | ImgHost rozpoznaje bieżące konto GitLab i rozszerza wartość do pełnej ścieżki projektu. |
| Pełna ścieżka projektu | ImgHost używa `username/project` dokładnie tak, jak wpisano. |
| Sprawdzenie projektu | Jeśli używasz ścieżki bieżącego konta osobistego, ImgHost automatycznie tworzy projekt, gdy nie istnieje. Jeśli wpiszesz pełną ścieżkę ręcznie, używa jej bez zmian. |
| Publiczne/prywatne | Widoczność projektu jest synchronizowana z bieżącym przełącznikiem. |

## Szybka lista

```text
Sign in to GitLab
-> Create an Access Token
-> Select only the api scope
-> Return to ImgHost and enter the token and project name
-> Save
-> If only a project name is entered, ImgHost adds the current username automatically
-> If username/project is entered, ImgHost uses it as-is
-> Upload a test image
```

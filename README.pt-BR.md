🌍 [Read in English](README.md)

# Mottu Mapping App

Aplicativo mobile para gerar relatórios e controlar o estoque usando visão computacional para identificar motos em um pátio.

## Tecnologias Utilizadas

- `React Native` - Framework para desenvolvimento mobile multiplataforma.
- `Expo` - Ferramenta para facilitar o desenvolvimento e build do app React Native.
- `TypeScript` - Superset do JavaScript com tipagem estática.
- `React Navigation` - Navegação entre telas do app.
- `AsyncStorage` - Armazenamento local para persistência de dados.
- `react-native-chart-kit` - Biblioteca para gráficos e visualização de dados.
- `Vision Computacional (backend)` - Processamento para identificar motos no pátio (detalhes da API backend).

## Funcionalidades

- Dashboard interativo com gráficos para acompanhamento da quantidade de motos por setores
- Visualização em tempo real do pátio com imagens capturadas.
- Geração de relatórios baseados nos dados coletados.
- Suporte bilingue (Português e Espanhol)
- Navegação fácil entre telas do app (Home, Pátio, Relatório).
- Suporte a tema claro e escuro

## Estrutura dos diretórios

```
│   App.tsx
│
├───assets # imagens, etc
│       favicon.png
│       logo.png
│       moto.png
│       patio.png
│       profile-generic.jpg
│
├───components # componentes reutilizáveis
│       Footer.tsx
│       Header.tsx
│       ImageModal.tsx
│       MotoCard.tsx
│       MotoModal.tsx
│       Separator.tsx
│
├───context 
│       AuthContext.tsx
│       ThemeContext.tsx
│
├───control 
│       modelControl.ts
│       motoControl.ts
│       sectorControl.ts
│       userControl.ts
│
├───fetcher
│       api.ts
│       modelFetcher.ts
│       motoFetcher.ts
│       sectorFetcher.ts
│       userFetcher.ts
│
├───i18n # suporte bilingue
│       es.ts
│       i18n.ts
│       pt.ts
│
├───model
│       ModelModel.ts
│       MotoModel.ts
│       navigation.ts
│       SectorModel.ts
│       UserModel.ts
│
├───navigation 
│       AuthStack.tsx
│       CustomDrawerContent.tsx
│       DrawerNavigator.tsx
│       MainNavigator.tsx
│
├───service
│       authService.ts
│       modelService.ts
│       motoService.ts
│       sectorService.ts
│       userService.ts
│
├───theme
│       colors.ts
│       styles.ts
│
├───utils # relatório
│       index.tsx
│
└───view 
        AboutView.tsx
        AccountView.tsx
        HomeView.tsx
        LoginView.tsx
        PatioView.tsx
        ReportView.tsx
        SettingsView.tsx
```

## Passos para instalação e execução

1. Clone o repositório da api:

```bash
git clone https://github.com/felipeclarindo/mottu-mapping-api-dotnet.git
```

2. Siga as intruções para executar no `Readme.md` da api.

3. Clone o repositório:

```bash
git clone https://github.com/felipeclarindo/mottu-mapping-mobile.git
```

4. Entre no diretório:

```bash
cd mottu-mapping-mobile
```

5. Instale as dependências:

```bash
npm install
```

6. Certifique-se de ter um dispositivo android para visualizar o app(emulador ou via depuracao).

7. Execute o app:

```bash
npx expo start
```

8. Pressione `A` para abrir o aplicativo no android.

**OBS: VOCÊ PRECISA SE CERTIFICAR DE TER O EMULADOR DO ANDROID OU ENTÃO CONECTAR O SEU CELULAR NO PC.**

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Time

- Felipe Clarindo - RM554547, 2TDSPF
- André Marcolongo - RM555285, 2TDSPV
- Nathália Gomes da Silva - RM554945, 2TDSPV


## Licença

Este projeto está licenciado sob a [GNU Affero License](https://www.gnu.org/licenses/agpl-3.0.html).

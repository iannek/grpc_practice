# 構成
## grpc_practice_noauth
react(grpcweb) →  envoy → backend

## grpc_practice_auth
上記に加えkeycloakで認証かけたもの(事前のkeycloak設定が必要)

# 利用
1. docker-comopse up -dで起動

2. ブラウザからlocalhost:3000で接続

3. sendボタンを押すと、ブラウザのコンソールにbackendから取得したcsvが表示される

## 事前のkeycloak設定
1. realm作成
  - Name…test

2. 作成したrealmでclinetsを作成する
  - Client ID…test
  - Root URL…http://localhost:3000/

3. 作成したrealmでユーザを作成(名前は何でもいい)。パスワードもcredentialsタブから設定する。

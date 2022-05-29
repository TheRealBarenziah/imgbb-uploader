# tl;dr

- Clone project
- `npm ci`
- `npm run dev`

# the long read

`npm run dev` is a shortcut for `npm run build && npm run lint && npm run test && npm run remap` :

- `npm run build` will remove existing `coverage` and `lib` folder, then compile the code in `src` into `lib` folder
- `npm run test` will generate 'import' tests from the require ones in `src/__tests__`, then run all that, & finally generate a coverage report
- `npm run lint` will run tslint on source files
- Coverage report in HTML can be found here: (`./coverage/lcov-report`).

See more scripts in `package.json`.

# docker container run chevereto

Useful for running the full test suite (docker-compose required)

- Create self-signed SSL certificate

```zsh
mkdir ~/cheveretoConfig &&
openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj \
    "/C=FR/ST=Totoland/L=Totocity/O=TotoInc/CN=toto.com" \
    -keyout ~/cheveretoConfig/ssl.key -out ~/cheveretoConfig/ssl.crt
```

- Create https-friendly config file for apache2

```zsh
echo "<VirtualHost *:80>
	ServerAdmin root@localhost
        ServerName toto.com
	DocumentRoot /var/www/html
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined
    RewriteEngine On
    RewriteCond %{HTTPS} off
    RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
</VirtualHost>

<VirtualHost *:443>
    ServerName toto.com
    ServerAdmin webmaster@test-https-docker.com
    DocumentRoot /var/www/html
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    SSLEngine on
    SSLCertificateFile    /etc/apache2/ssl/ssl.crt
    SSLCertificateKeyFile   /etc/apache2/ssl/ssl.key
</VirtualHost>" > ~/cheveretoConfig/000-default.conf
```

- Run [docker-compose](https://docs.docker.com/compose/reference/up/)

```zsh
docker-compose up -d
# use 'docker-compose down' to stop all
```

### Finalize Chevereto setup

- Go to http://localhost:9001 && https://localhost:9002
- ???
- PROFIT (Tip: disable "Flood protection" in Dashboard>Settings so the CI doesn't randomly fail on duplicate upload)

## Deploy with K(uwu)bernetes :rocket:

- (optional) Install [k(uwu)be](https://k3s.io/):

```zsh
curl -sfL https://get.k3s.io | sh -s -
```

- (optional) Install [kns](https://github.com/blendle/kns) & [dance around k3s.yaml permission issue](https://github.com/k3s-io/k3s/issues/389#issuecomment-743915680) (im using zsh)

```zsh
sudo curl https://raw.githubusercontent.com/blendle/kns/master/bin/kns -o /usr/local/bin/kns && \
sudo chmod +x $_ && \
mkdir ~/.kube && \
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config && \
sudo chown "$USER":"$USER" ~/.kube/config && \
echo "alias k='kubectl'" >> ~/.zshrc && \
echo "export KUBECONFIG=~/.kube/config" >> ~/.zshrc && \
source ~/.zshrc
```

- (optional) Install [kube-ps1](https://github.com/jonmosco/kube-ps1)

```zsh
cd ~ && \
git clone https://github.com/jonmosco/kube-ps1.git && \
echo "source ~/kube-ps1/kube-ps1.sh" >> ~/.zshrc && \
echo "PROMPT='\$(kube_ps1)'\$PROMPT" >> ~/.zshrc && \
source ~/.zshrc
```

- Create k(uwu)be namespace: `kubectl create namespace chevereto-free`
- Switch to this namespace: `kns`
- Edit `spec.rules.host` of ingress rules in `./src/__tests__/chevereto/kube/ing` files
- For HTTPS, put your TLS certificate inside `chevereto-free` namespace & reference it in `tls` section of `./src/__tests__/chevereto/kube/ing/https-chevereto-ingress.yaml`
- Apply the stuff: `kubectl apply -f ./src/__tests__/chevereto/kube --recursive`
- Finalize the setup by creating a Chevereto admin account; ensure both HTTP & HTTPS URLs are working using private browsing
- Before running the test suite, don't forget to create an `.env` file at project root (following `.env.example` template)

# Additional infos

If you don't know the purpose of some config files, [this excellent resource](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c) should guide you through.

`'Issue' || 'PR'` are both appreciated :)

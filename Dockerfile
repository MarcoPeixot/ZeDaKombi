FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# Instala dependências
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libc6-dev \
    m4 \
    g++-multilib \
    autoconf \
    libtool \
    unzip \
    git \
    wget \
    curl \
    python3 \
    python3-zmq \
    ca-certificates \
    cmake \
    libevent-dev \
    bsdmainutils \
    libboost-all-dev \
    libssl-dev \
    libdb-dev \
    libdb++-dev \
    && rm -rf /var/lib/apt/lists/*

# Clona o repositório do Zcash
RUN git clone https://github.com/zcash/zcash.git /zcash

WORKDIR /zcash

# Compila o Zcash
RUN git checkout v5.9.0 && ./zcutil/fetch-params.sh && ./zcutil/build.sh -j$(nproc)

# Cria diretório de configuração
RUN mkdir -p /root/.zcash
COPY zcash.conf /root/.zcash/zcash.conf

EXPOSE 8232 8233

CMD ["./src/zcashd", "--testnet", "--rpcallowip=0.0.0.0/0", "--rpcbind=0.0.0.0", "--rpcport=18232", "--server", "--rpcuser=user", "--rpcpassword=password", "--walletrequirebackup=0"]

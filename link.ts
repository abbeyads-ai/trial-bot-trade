from web3 import Web3

# 1. Hubungkan ke RPC Polygon (Gunakan provider seperti Alchemy atau Infura)
polygon_rpc_url = "https://polygon-rpc.com" 
w3 = Web3(Web3.HTTPProvider(polygon_rpc_url))

# 2. Alamat Kontrak Chainlink BTC/USD di Polygon
# Sumber: https://chain.link
btc_usd_address = "0xc907E11305CC23f932e139190740a1262d197395"

# 3. ABI Sederhana untuk fungsi latestRoundData
abi = '[{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"}]'

def get_btc_price():
    if not w3.is_connected():
        return "Gagal terhubung ke jaringan"

    contract = w3.eth.contract(address=btc_usd_address, abi=abi)
    
    # Memanggil data terbaru
    latest_data = contract.functions.latestRoundData().call()
    
    # Harga BTC (Chainlink BTC/USD memiliki 8 desimal di Polygon)
    raw_price = latest_data[1]
    actual_price = raw_price / 10**8
    
    return actual_price

# Contoh Penggunaan
if __name__ == "__main__":
    btc_price = get_btc_price()
    print(f"Harga BTC/USD saat ini (Chainlink): ${btc_price:,.2f}")

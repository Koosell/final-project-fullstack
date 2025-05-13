from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Data Game
game_data = {
    "Mobile Legends": {
        "image": "ml.jpeg",
        "nominals": [
            {"label": "Weekly Pass", "price": "Rp 24.557", "img": "wdp.jpeg"},
            {"label": "Twilight Pass", "price": "Rp 149.900", "img": "diamond.jpeg"},
            {"label": "86 Diamonds", "price": "Rp 23.500", "img": "diamond.jpeg"},
            {"label": "172 Diamonds", "price": "Rp 47.500", "img": "diamond.jpeg"},
            {"label": "257 Diamonds", "price": "Rp 70.000", "img": "diamond.jpeg"},
        ]
    },
    "Free Fire": {
        "image": "ff.jpeg",
        "nominals": [
            {"label": "100 Diamond", "price": "Rp 16.000", "img": "diamondff.jpg"},
            {"label": "210 Diamond", "price": "Rp 32.000", "img": "diamondff.jpg"},
            {"label": "530 Diamond", "price": "Rp 79.000", "img": "diamondff.jpg"},
            {"label": "Double Daily Diamond", "price": "Rp 30.000", "img": "diamondff.jpg"},
        ]
    },
    "PUBG": {
        "image": "pubg.jpeg",
        "nominals": [
            {"label": "60 UC", "price": "Rp 15.000", "img": "uc.jpg"},
            {"label": "325 UC", "price": "Rp 75.000", "img": "uc.jpg"},
            {"label": "660 UC", "price": "Rp 145.000", "img": "uc.jpg"},
            {"label": "1800 UC", "price": "Rp 375.000", "img": "uc.jpg"},
        ]
    }
}

# Halaman Utama
@app.route('/')
def index():
    return render_template('index.html')

# Halaman Login
@app.route('/login')
def login():
    return render_template('login.html')

# Halaman Register (Daftar)
@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Ambil data dari form pendaftaran
        username = request.form['username']
        password = request.form['password']
        
        # Lakukan proses pendaftaran (misalnya, simpan di database)
        # Untuk sekarang kita hanya menampilkan username dan password sebagai contoh
        return f"<h2>Akun berhasil dibuat!</h2><p>Username: {username}</p><p>Password: {password}</p>"
    
    # Jika method GET, tampilkan halaman pendaftaran
    return render_template('register.html')

# Halaman Checkout
@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        game = request.form['game']
        game_id = request.form['game_id']
        jumlah = request.form.get('jumlah', 'Tidak dipilih')
        metode = request.form['metode']
        
        return f"<h2>Pesanan Anda:</h2><p>Game: {game}</p><p>ID: {game_id}</p><p>Diamond: {jumlah}</p><p>Pembayaran: {metode}</p>"

    # Untuk GET request
    game = request.args.get('game', 'Mobile Legends')
    data = game_data.get(game, game_data["Mobile Legends"])
    return render_template('checkout.html', game=game, image=data["image"], nominals=data["nominals"])

if __name__ == '__main__':
    app.run(debug=True)

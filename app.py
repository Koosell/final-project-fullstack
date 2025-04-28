from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

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
        # Ambil data dari formulir POST
        game = request.form['game']
        game_id = request.form['game_id']
        jumlah = request.form['jumlah']
        metode = request.form['metode']
        
        # Tampilkan informasi pesanan di halaman baru atau bisa dibuat lebih fancy
        return f"<h2>Pesanan Anda:</h2><p>Game: {game}</p><p>ID: {game_id}</p><p>Diamond: {jumlah}</p><p>Pembayaran: {metode}</p>"

    # Jika GET, ambil data dari query string atau parameter
    game = request.args.get('game', 'Tidak diketahui')  # Default 'Tidak diketahui'
    return render_template('checkout.html', game=game)

if __name__ == '__main__':
    app.run(debug=True)

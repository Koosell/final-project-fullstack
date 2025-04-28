from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Route untuk halaman utama (Beranda)
@app.route('/')
def index():
    return render_template('index.html')

# Route untuk halaman login
@app.route('/login')
def login():
    return render_template('login.html')  # Menampilkan halaman login

# Route untuk login dengan Google
@app.route('/login-google', methods=['POST'])
def login_google():
    # Logika autentikasi Google (misalnya menggunakan OAuth2)
    return redirect(url_for('dashboard'))  # Ganti dengan logika sesuai aplikasi kamu

# Route untuk login dengan Facebook
@app.route('/login-facebook', methods=['POST'])
def login_facebook():
    # Logika autentikasi Facebook (misalnya menggunakan OAuth2)
    return redirect(url_for('dashboard'))  # Ganti dengan logika sesuai aplikasi kamu

# Route untuk dashboard setelah login berhasil
@app.route('/dashboard')
def dashboard():
    return "<h1>Selamat datang di dashboard!</h1>"

# Route untuk checkout (halaman lain, bisa disesuaikan)
@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        game = request.form['game']
        game_id = request.form['game_id']
        jumlah = request.form['jumlah']
        metode = request.form['metode']
        
        # Tampilkan informasi pesanan di halaman baru atau bisa dibuat lebih fancy
        return f"<h2>Pesanan Anda:</h2><p>Game: {game}</p><p>ID: {game_id}</p><p>Diamond: {jumlah}</p><p>Pembayaran: {metode}</p>"

    game = request.args.get('game', 'Tidak diketahui')  # Default 'Tidak diketahui'
    return render_template('checkout.html', game=game)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        game = request.form['game']
        game_id = request.form['game_id']
        jumlah = request.form['jumlah']
        metode = request.form['metode']
        return f"<h2>Pesanan Anda:</h2><p>Game: {game}</p><p>ID: {game_id}</p><p>Diamond: {jumlah}</p><p>Pembayaran: {metode}</p>"

    # Ambil nama game dari URL saat GET
    game = request.args.get('game', 'Tidak diketahui')
    return render_template('checkout.html', game=game)

if __name__ == '__main__':
    app.run(debug=True)

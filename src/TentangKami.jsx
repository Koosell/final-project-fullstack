import React from 'react';
import './css/TentangKami.css';
import './css/TentangKamiAnimations.css';

const TentangKami = () => {
  return (
    <div className="container">
      {/* Content Section */}
      <section className="content">
        <p className="paragraph" style={{ '--index': 0 }}>
          Selamat datang di ABC TOP-UP, destinasi terpercaya bagi para gamer yang mencari layanan top up cepat, aman, dan terjangkau! Kami hadir sebagai solusi terbaik untuk memenuhi kebutuhan digital kamu dalam bermain game favorit, mulai dari Mobile Legends, Free Fire, PUBG Mobile, Higgs Domino, Valorant, hingga berbagai judul populer lainnya.
        </p>
        <p className="paragraph" style={{ '--index': 1 }}>
          Di ABC TOP-UP, kami memahami bahwa kecepatan dan kemudahan adalah segalanya. Oleh karena itu, kami menghadirkan sistem top up otomatis yang memungkinkan kamu mendapatkan item atau diamond hanya dalam hitungan detik, tanpa harus menunggu lama. Cukup beberapa klik, saldo game kamu langsung bertambah!
        </p>
        <p className="paragraph" style={{ '--index': 2 }}>
          Tak hanya itu, kami juga menjunjung tinggi aspek keamanan dan kenyamanan transaksi. Setiap pesanan diproses dengan sistem yang andal, serta dilengkapi dengan tim layanan pelanggan yang responsif dan siap membantu kamu kapan saja. Kepuasan pelanggan adalah komitmen utama kami — karena kami percaya bahwa pengalaman bermain game yang menyenangkan dimulai dari proses top up yang lancar.
        </p>
        <p className="paragraph" style={{ '--index': 3 }}>
          Dengan harga yang bersaing, promo menarik, dan pelayanan profesional, ABC TOP-UP terus berupaya memberikan yang terbaik bagi komunitas gamer di seluruh Indonesia. Kami bangga telah menjadi pilihan utama bagi ribuan pelanggan setia yang mempercayakan kebutuhan top up mereka kepada kami.
        </p>
        <p className="paragraph" style={{ '--index': 4 }}>
          Terima kasih telah memilih ABC TOP-UP. Yuk, tingkatkan pengalaman bermain kamu bersama kami — karena di dunia game, waktu dan kenyamanan adalah segalanya!
        </p>
      </section>
      {/* Decorative Element */}
      <div className="decorative-line"></div>
    </div>
  );
};

export default TentangKami;
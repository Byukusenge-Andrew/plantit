const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 text-center border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-secondary">Ahorrá tiempo</h2>
          <p className="mt-4 text-gray-600">Centralizá toda tu data en un solo lugar...</p>
        </div>
        <div className="p-6 text-center border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-secondary">Comprendé a tu equipo</h2>
          <p className="mt-4 text-gray-600">Obtené feedback para mejorar tus decisiones...</p>
        </div>
        <div className="p-6 text-center border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-secondary">Otra característica</h2>
          <p className="mt-4 text-gray-600">Descripción breve de la característica...</p>
        </div>
      </div>
    </section>
  );
};

export default Features;

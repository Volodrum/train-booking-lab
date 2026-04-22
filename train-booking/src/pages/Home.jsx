import TrainList from '../components/TrainList';

const Home = () => {
  return (
    <main>
      <h1 style={{ textAlign: 'center', margin: '40px 0', color: '#2d3748' }}>
        Пошук залізничних квитків
      </h1>
      <TrainList />
    </main>
  );
};

export default Home;
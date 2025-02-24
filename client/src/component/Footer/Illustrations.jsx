const Illustrations = () => {
  return (
    <div
      className='flex justify-center items-center h-screen  '
      style={{ background: 'var(--main-color)' }}
    >
      <div className='flex flex-col justify-center items-center text-center p-5 border-3 border-blue-500 mt-10 '>
        <h1 className='text-3xl mb-2 text-blue-200 lg:text-4xl'>
          Illustrations
        </h1>
        <a
          href='https://storyset.com/happy'
          className='text-blue-100 hover:underline lg:text-2xl'
        >
          Happy illustrations by Storyset
        </a>
        <a
          href='https://storyset.com/online'
          className='text-blue-100 hover:underline lg:text-2xl'
        >
          Online illustrations by Storyset
        </a>
      </div>
    </div>
  );
};

export default Illustrations;

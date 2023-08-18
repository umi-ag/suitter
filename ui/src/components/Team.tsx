import Image from 'next/image'

const people = [
  {
    imageUrl: "/img/team/fuyu.png",
    name: 'FUKUDA Yutaro',
    position: 'CEO',
  },
  {
    imageUrl: "/img/team/takaya.png",
    name: 'IMAGAWA Takaya',
    position: 'CTO',
  },
  {
    imageUrl: "/img/team/taro.png",
    name: 'KIMURA Taro',
    position: 'Head of BD',
  },
  {
    imageUrl: "/img/team/kenji.png",
    name: 'NARUSHIMA Kenji',
    position: 'CFO',
  },
  {
    imageUrl: "/img/team/yusei.png",
    name: 'TANAKA Yusei',
    position: 'Dev',
  },
  {
    imageUrl: "/img/team/wasabi.png",
    name: 'HORIUCHI Shusei',
    position: 'Dev',
  },
  {
    imageUrl: "/img/team/kohei.png",
    name: 'KAWAMURA Kohei',
    position: 'Head of marketing',
  },
]

const Team = () => {
  return (
    <section id='team' className="py-12 bg-gray-100 lg:py-16 xl:py-28">
      <div className="container px-5 mx-auto">
        <div className="grid gap-6 lg:gap-10 xl:grid-cols-3">
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-2xl font-black sm:text-3xl">チーム</h2>
            <p className="w-full text-gray-600 sm:w-1/2 xl:w-80 md:text-lg"></p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-10 xl:col-span-2">
            {people.map((person, i) => (
              <div key={i} className="space-y-5">
                <Image
                  className="w-full h-full transition-shadow duration-200 shadow rounded-xl hover:shadow-lg"
                  src={person.imageUrl}
                  alt={person.name}
                  width={346}
                  height={346}
                  layout="intrinsic"
                  loading="eager"
                />
                <div className="space-y-1">
                  <h4 className="font-medium lg:text-lg">{person.name}</h4>
                  <p className="text-gray-600">{person.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;

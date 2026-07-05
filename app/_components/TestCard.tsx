type Props = {
  nama: string;
};

export default function TestCard(props: Props) {
  return (
    <div>
      Halo {props.nama} 🚀
    </div>
  );
}
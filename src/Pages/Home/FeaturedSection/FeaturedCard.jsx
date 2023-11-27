

const FeaturedCard = ({item,refetch}) => {
    const {product_name,timestamp} = item;
    refetch();
    return (
        <div>
            <div>
                <h3 className="uppercase">{product_name}----------</h3>
                <p>{timestamp}</p>
            </div>
        </div>
    );
};

export default FeaturedCard;
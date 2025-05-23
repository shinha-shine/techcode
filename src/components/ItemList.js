import {Button,  Card } from 'antd';
import {useDispatch} from "react-redux";

const ItemList = ({item}) => {
  const dispatch = useDispatch();
  //update cart handler
  const handleAddTOCart = () => {
    dispatch({
      type : 'ADD-TO-CART',
      payload : {...item, quantity: 1},
    })
  }
  const { Meta } = Card;

  return (
  <div>
    <Card
  hoverable
  style={{ width: 150, marginTop: 5 }}
  cover={<img alt={item.name} src={item.image} style={{ height: 150 }} />}
>
  <Meta
    title={
      <div style={{ wordWrap: 'break-word', fontSize: '14px' }}>
        {item.name}
      </div>
    }
    description={
      <div style={{ fontSize: '10.5px', marginTop: '4px', color: '#555' }}>
        {item.description}
      </div>
    }
  />
  <div className='Item-button'>
    <Button onClick={handleAddTOCart}>Add to cart</Button>
  </div>
</Card>

  </div>
  );
};

export default ItemList;

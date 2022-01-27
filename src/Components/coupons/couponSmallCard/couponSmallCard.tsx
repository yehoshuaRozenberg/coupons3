import { useHistory } from "react-router-dom";
import "./couponSmallCard.css";
import store from "../../redux/store";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { orange, red } from '@mui/material/colors';
import { Button } from "@material-ui/core";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { AddToCartAction, CartSum, couponsForViewAction, DeleteFromCartAction } from "../../redux/couponsState";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

interface CouponSmallCard {
    id: number;
    title: string;
    price: number;
    discount: string;
    description: string;
    image: string;
    category: number;
    amount: number;
}



function CouponSmallCard(props: CouponSmallCard): JSX.Element {
    let history = useHistory();
    let type = store.getState().authState.userDetails.clientType
    console.log("in small card")

    function addToCart() {
        const coupon= store.getState().CouponsState.allCoupons.find(coupon => coupon.id == props.id);
        store.dispatch(AddToCartAction(coupon))
    }

    function removeFromCart() {
        store.dispatch(DeleteFromCartAction(props.id))
        store.dispatch(couponsForViewAction(store.getState().CouponsState.cart));
    }

    const edit = <div>
        <Button startIcon={<ModeEditIcon />} onClick={() => history.push("/private/screen/company/coupon/update/:" + props.id)}> </Button>
        <br /><br />
        <Button startIcon={<DeleteIcon />} onClick={() => history.push("/private/screen/company/coupon/delete/:" + props.id)}> </Button>
        <br /><br />
    </div>

    const purchase =
        <div className="customer">
            <Button type="submit" color="primary" onClick={() => type === "Customers" ?
                 history.push("/private/screen/customer/coupon/payment/:" + props.id) : history.push("/coupon/payment/:" + props.id) 
            } variant="outlined" size="small">Buy now</Button>
            <IconButton aria-label="cart">
                {!history.location.pathname.includes("cart")?
                /*!store.getState().CouponsState.cart.includes(store.getState().CouponsState.allCoupons.find(coupon => coupon.id == props.id))*/
                <AddShoppingCartOutlinedIcon color="primary" onClick={addToCart} />:
                <RemoveShoppingCartOutlinedIcon color="primary" onClick={removeFromCart} />}
            </IconButton>
            <br />
        </div>

    const amountAlert = <div style={{ background: orange[700], fontSize: 17 }}>
        **only {props.amount} left**
    </div>


    return (
        <div className="CouponSmallCard ">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500], width: 50, height: 50 }} >
                            {props.discount}
                        </Avatar>
                    }
                    action={
                        (((type == "Administrator")||(type == "Companies")) && 
                        (history.location.pathname != "/guest/main")&&(!history.location.pathname.includes("cart"))) 
                        && "id: " + props.id
                    }
                    title={<div className="copuonTitle">{props.title} </div>}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={props.image}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.description} <br /><br />
                        <div style={{ color: red[500], fontSize: 17 }}><b> only  {props.price} $ </b></div> <br />
                        {props.amount <= 150 && amountAlert}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {((type != "Companies" && type != "Administrator") && (history.location.pathname != "/private/screen/customer/coupons") ||
                        (history.location.pathname === "/guest/main")||(history.location.pathname.includes("cart"))) && purchase}
                    {(type === "Companies" && history.location.pathname.includes("/private/screen")) && edit}
                    <div className="rightSide">
                        <Button type="submit" color="primary" onClick={() => type === "" ?
                            history.push("/coupon/getOne/:" + props.id) : history.push("/private/screen/coupon/getOne/:" + props.id)}
                            variant="outlined" size="small">More..</Button>
                    </div>
                </CardActions>
            </Card>
        </div>
    );
}

export default CouponSmallCard;

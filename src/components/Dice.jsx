import { motion } from "framer-motion";

export default function Dice(props) {
  return (
    <motion.button
      className="dice"
      style={{ backgroundColor: props.held ? 'green' : '' }}
      onClick={props.handleHold}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 0.5 }}
    >
      {props.value}
    </motion.button>
  );
}

import React, { useContext } from "react";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { useStyles } from "../utils/styles";
import dynamic from "next/dynamic";
import Link from "next/link";
import Router from "next/router";
import { getProducts } from "../utils/data";

export default function Cart(){
    return (
        <h1>Cart</h1>
    );
}
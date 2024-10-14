import React from "react";

export default function Cheatsheet() {
  return (
    <>
      <h2 className="w-full border-b py-5 text-center">CheatSheet</h2>
      <div className="flex w-full text-xs">
        <div className="ml-2 w-64 border-r p-1">
          <p>Steel + _ + _ = ADAMANT</p>
          <p>Silver + _ + _ = MITHRIL</p>
          <p>_ + _ + _ = COLD IRON</p>
        </div>

        <div className="ml-2 flex w-full justify-around p-1 text-xs">
          <div>
            <p>ADAMANT </p>
            <p>hardness: 20</p>
            <p>magic: 11</p>
            <p>purity: 8</p>
          </div>
          <div>
            <p>Cold Iron </p>
            <p>hardness: 10</p>
            <p>magic: 15</p>
            <p>purity: 20</p>
          </div>
          <div>
            <p>Mithril </p>
            <p>hardness: 10</p>
            <p>magic: 20</p>
            <p>purity: 10</p>
          </div>
        </div>
      </div>
    </>
  );
}

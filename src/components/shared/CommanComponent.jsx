import React from "react";

export default function CommanComponent({ loading, btnMsg }) {
  return (
    <div>hii
      
    </div>
  );
}

export function BtnLoadingProcess({ loading, btnMsg }) {
    return (
      <div>
        {loading ? (
          <div>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </div>
        ) : (
          btnMsg
        )}
      </div>
    );
  }

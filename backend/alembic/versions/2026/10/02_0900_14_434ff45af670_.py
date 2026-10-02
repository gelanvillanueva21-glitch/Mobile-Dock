"""empty message

Revision ID: 434ff45af670
Revises: 34ae9a498cec
Create Date: 2026-10-02 09:00:14.302464

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '434ff45af670'
down_revision: Union[str, Sequence[str], None] = '34ae9a498cec'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
